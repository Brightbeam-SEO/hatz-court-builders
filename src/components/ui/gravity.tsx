"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Matter, {
  Bodies,
  Body,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  Runner,
  World,
} from "matter-js";
import { debounce } from "@/lib/debounce";
import { cn } from "@/lib/utils";

function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number,
) {
  if (typeof value === "string" && value.endsWith("%")) {
    const percentage = parseFloat(value) / 100;
    return containerSize * percentage;
  }
  return typeof value === "number" ? value : elementSize - containerSize + elementSize / 2;
}

function registerStableKey(options: Matter.IBodyDefinition | undefined) {
  if (!options) return "";
  return `${options.friction ?? ""}:${options.frictionAir ?? ""}:${options.restitution ?? ""}:${options.density ?? ""}:${options.isStatic ?? ""}`;
}

type GravityProps = {
  children: ReactNode;
  debug?: boolean;
  gravity?: { x: number; y: number };
  resetOnResize?: boolean;
  grabCursor?: boolean;
  addTopWall?: boolean;
  autoStart?: boolean;
  className?: string;
};

type PhysicsBody = {
  element: HTMLElement;
  body: Matter.Body;
  props: MatterBodyProps;
};

export type MatterBodyProps = {
  children: ReactNode;
  matterBodyOptions?: Matter.IBodyDefinition;
  isDraggable?: boolean;
  x?: number | string;
  y?: number | string;
  angle?: number;
  className?: string;
  /** Scales the physics circle relative to the element size (default 1). */
  collisionScale?: number;
};

export type GravityRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

type WallBodies = {
  floor: Matter.Body;
  left: Matter.Body;
  right: Matter.Body;
  top: Matter.Body | null;
};

const GravityContext = createContext<{
  registerElement: (id: string, element: HTMLElement, props: MatterBodyProps) => void;
  unregisterElement: (id: string) => void;
  ready: number;
} | null>(null);

export function MatterBody({
  children,
  className,
  matterBodyOptions = {
    friction: 0.08,
    restitution: 0.45,
    density: 0.002,
    isStatic: false,
  },
  isDraggable = true,
  x = 0,
  y = 0,
  angle = 0,
  collisionScale = 1,
}: MatterBodyProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const context = useContext(GravityContext);
  const physicsReady = context?.ready ?? 0;

  useEffect(() => {
    if (!elementRef.current || !context || physicsReady === 0) return;

    context.registerElement(reactId, elementRef.current, {
      children,
      matterBodyOptions,
      isDraggable,
      x,
      y,
      angle,
      className,
      collisionScale,
    });

    return () => context.unregisterElement(reactId);
  }, [
    reactId,
    context,
    physicsReady,
    registerStableKey(matterBodyOptions),
    isDraggable,
    x,
    y,
    angle,
    className,
    collisionScale,
  ]);

  return (
    <div
      ref={elementRef}
      className={cn("absolute left-0 top-0 will-change-transform", className, isDraggable && "pointer-events-none")}
    >
      {children}
    </div>
  );
}

export const Gravity = forwardRef<GravityRef, GravityProps>(function Gravity(
  {
    children,
    debug = false,
    gravity = { x: 0, y: 1 },
    grabCursor = true,
    resetOnResize = true,
    addTopWall = true,
    autoStart = true,
    className,
  },
  ref,
) {
  const canvas = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());
  const render = useRef<Render | null>(null);
  const runner = useRef<Runner | null>(null);
  const bodiesMap = useRef(new Map<string, PhysicsBody>());
  const frameId = useRef<number | null>(null);
  const mouseConstraint = useRef<Matter.MouseConstraint | null>(null);
  const wallsRef = useRef<WallBodies | null>(null);
  const mouseDown = useRef(false);
  const isRunning = useRef(false);
  const [ready, setReady] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const updateElements = useCallback(() => {
    bodiesMap.current.forEach(({ element, body }) => {
      const { x, y } = body.position;
      const rotation = body.angle * (180 / Math.PI);
      element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
    });
    frameId.current = requestAnimationFrame(updateElements);
  }, []);

  const createWalls = useCallback(
    (width: number, height: number) => {
      const wallOptions = {
        isStatic: true,
        friction: 1,
        render: { visible: debug },
      } as const;

      return {
        floor: Bodies.rectangle(width / 2, height + 10, width, 20, wallOptions),
        right: Bodies.rectangle(width + 10, height / 2, 20, height, wallOptions),
        left: Bodies.rectangle(-10, height / 2, 20, height, wallOptions),
        top: addTopWall ? Bodies.rectangle(width / 2, -10, width, 20, wallOptions) : null,
      };
    },
    [addTopWall, debug],
  );

  const registerElement = useCallback(
    (id: string, element: HTMLElement, props: MatterBodyProps) => {
      if (!canvas.current) return;

      const existing = bodiesMap.current.get(id);
      if (existing) {
        World.remove(engine.current.world, existing.body);
        bodiesMap.current.delete(id);
      }

      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const canvasRect = canvas.current.getBoundingClientRect();
      const angleRad = (props.angle || 0) * (Math.PI / 180);
      const x = calculatePosition(props.x, canvasRect.width, width);
      const y = calculatePosition(props.y, canvasRect.height, height);
      const collisionScale = props.collisionScale ?? 1;
      const radius = (Math.max(width, height) / 2) * collisionScale;

      const body = Bodies.circle(x, y, radius, {
        ...props.matterBodyOptions,
        angle: angleRad,
        render: {
          fillStyle: debug ? "#888888" : "#00000000",
          strokeStyle: debug ? "#333333" : "#00000000",
          lineWidth: debug ? 3 : 0,
        },
      });

      World.add(engine.current.world, body);
      bodiesMap.current.set(id, { element, body, props });
    },
    [debug],
  );

  const unregisterElement = useCallback((id: string) => {
    const entry = bodiesMap.current.get(id);
    if (!entry) return;
    World.remove(engine.current.world, entry.body);
    bodiesMap.current.delete(id);
  }, []);

  const stopLoop = useCallback(() => {
    if (frameId.current !== null) {
      cancelAnimationFrame(frameId.current);
      frameId.current = null;
    }
  }, []);

  const clearRenderer = useCallback(() => {
    stopLoop();

    if (mouseConstraint.current) {
      World.remove(engine.current.world, mouseConstraint.current);
      mouseConstraint.current = null;
    }

    if (wallsRef.current) {
      const { floor, left, right, top } = wallsRef.current;
      World.remove(engine.current.world, [floor, left, right, ...(top ? [top] : [])]);
      wallsRef.current = null;
    }

    if (render.current) {
      Mouse.clearSourceEvents(render.current.mouse);
      Render.stop(render.current);
      render.current.canvas.remove();
      render.current = null;
    }

    if (runner.current) {
      Runner.stop(runner.current);
      runner.current = null;
    }

    bodiesMap.current.forEach(({ body }) => World.remove(engine.current.world, body));
    bodiesMap.current.clear();
    World.clear(engine.current.world, false);
    Engine.clear(engine.current);
    engine.current = Engine.create();
    isRunning.current = false;
  }, [stopLoop]);

  const startEngine = useCallback(() => {
    if (!runner.current || !render.current) return;
    Runner.run(runner.current, engine.current);
    Render.run(render.current);
    if (frameId.current === null) {
      frameId.current = requestAnimationFrame(updateElements);
    }
    isRunning.current = true;
  }, [updateElements]);

  const stopEngine = useCallback(() => {
    if (!isRunning.current) return;
    if (runner.current) Runner.stop(runner.current);
    if (render.current) Render.stop(render.current);
    stopLoop();
    isRunning.current = false;
  }, [stopLoop]);

  const initializeRenderer = useCallback(() => {
    if (!canvas.current) return;

    const height = canvas.current.offsetHeight;
    const width = canvas.current.offsetWidth;
    if (width <= 0 || height <= 0) return;

    setCanvasSize({ width, height });
    engine.current.gravity.x = gravity.x;
    engine.current.gravity.y = gravity.y;

    render.current = Render.create({
      element: canvas.current,
      engine: engine.current,
      options: {
        width,
        height,
        wireframes: false,
        background: "#00000000",
      },
    });

    const mouse = Mouse.create(render.current.canvas);
    mouseConstraint.current = MouseConstraint.create(engine.current, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: debug },
      },
    });

    const walls = createWalls(width, height);
    wallsRef.current = walls;

    const touchingMouse = () => {
      const position = mouseConstraint.current?.mouse.position;
      if (!position) return false;
      return Query.point(engine.current.world.bodies, position).length > 0;
    };

    if (grabCursor) {
      const canvasEl = canvas.current;
      Events.on(engine.current, "beforeUpdate", () => {
        if (!mouseDown.current && !touchingMouse()) {
          canvasEl.style.cursor = "default";
        } else if (touchingMouse()) {
          canvasEl.style.cursor = mouseDown.current ? "grabbing" : "grab";
        }
      });

      const onMouseDown = () => {
        mouseDown.current = true;
        canvasEl.style.cursor = touchingMouse() ? "grabbing" : "default";
      };

      const onMouseUp = () => {
        mouseDown.current = false;
        canvasEl.style.cursor = touchingMouse() ? "grab" : "default";
      };

      canvasEl.addEventListener("mousedown", onMouseDown);
      canvasEl.addEventListener("mouseup", onMouseUp);
    }

    World.add(engine.current.world, [
      mouseConstraint.current,
      walls.floor,
      walls.left,
      walls.right,
      ...(walls.top ? [walls.top] : []),
    ]);

    render.current.mouse = mouse;
    runner.current = Runner.create();
    runner.current.enabled = autoStart;
    if (autoStart) startEngine();
    setReady((value) => value + 1);
  }, [autoStart, createWalls, debug, grabCursor, gravity.x, gravity.y, startEngine]);

  const handleResize = useCallback(() => {
    if (!canvas.current || !resetOnResize) return;
    clearRenderer();
    initializeRenderer();
  }, [clearRenderer, initializeRenderer, resetOnResize]);

  const reset = useCallback(() => {
    stopEngine();
    bodiesMap.current.forEach(({ element, body, props }) => {
      Body.setAngle(body, ((props.angle || 0) * Math.PI) / 180);
      const x = calculatePosition(props.x, canvasSize.width, element.offsetWidth);
      const y = calculatePosition(props.y, canvasSize.height, element.offsetHeight);
      Body.setPosition(body, { x, y });
      Body.setVelocity(body, { x: 0, y: 0 });
      Body.setAngularVelocity(body, 0);
    });
    startEngine();
  }, [canvasSize.height, canvasSize.width, startEngine, stopEngine]);

  useImperativeHandle(ref, () => ({ start: startEngine, stop: stopEngine, reset }), [
    reset,
    startEngine,
    stopEngine,
  ]);

  useEffect(() => {
    if (!resetOnResize) return;
    const debouncedResize = debounce(handleResize, 300);
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      debouncedResize.cancel();
    };
  }, [handleResize, resetOnResize]);

  useEffect(() => {
    initializeRenderer();
    return clearRenderer;
  }, [clearRenderer, initializeRenderer]);

  const contextValue = useMemo(
    () => ({ registerElement, unregisterElement, ready }),
    [registerElement, unregisterElement, ready],
  );

  return (
    <GravityContext.Provider value={contextValue}>
      <div ref={canvas} className={cn("absolute inset-0 h-full w-full touch-none", className)}>
        {children}
      </div>
    </GravityContext.Provider>
  );
});
