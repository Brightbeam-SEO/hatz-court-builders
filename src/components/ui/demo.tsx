import InteractiveBentoGallery, { type MediaItemType } from "@/components/ui/interactive-bento-gallery";

const mediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    title: "Court Concept 01",
    desc: "Custom outdoor court layout",
    url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Court Concept 02",
    desc: "Sports-ready multi-use setup",
    url: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Court Concept 03",
    desc: "Premium backyard sport space",
    url: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Court Concept 04",
    desc: "Clean striping and finish",
    url: "https://images.unsplash.com/photo-1495555687392-3f50d6e79e1e",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
];

export function BentoGridGalleryDemo() {
  return (
    <div className="min-h-screen overflow-y-auto">
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="Gallery Shots Collection"
        description="Drag and explore our curated collection of shots"
      />
    </div>
  );
}
