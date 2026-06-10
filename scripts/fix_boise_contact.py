from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src/components/landing/boise-bottom-contact-section.tsx"
t = p.read_text(encoding="utf-8")
bad = chr(60) + "motionless"
t = t.replace(bad + " />", "")
t = t.replace(bad + ">", chr(60) + "div>")
t = t.replace(chr(60) + "/motionless" + chr(62), chr(60) + "/div" + chr(62))
# fix wrong closing tags from corruption
t = t.replace("                </motionless>\n              )}", "                </motionless>\n              )}")
t = t.replace("                </motionless>\n              )}", "                </div>\n              )}")
t = t.replace("            </motionless>\n          </motionless>\n        </motionless>\n      </motionless>", "            </div>\n          </motionless>\n        </motionless>\n      </motionless>")
for _ in range(5):
    t = t.replace("</motionless>", "</div>")
    t = t.replace("<motionless>", "<div>")
p.write_text(t, encoding="utf-8")
print("fixed")
