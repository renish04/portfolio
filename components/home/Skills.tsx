import { skills } from "@/content/site";
import { Chip } from "../Chip";
export function Skills() {
  return (
    <div className="skills">
      {skills
        .filter((group) => group.items.some(Boolean))
        .map((group) => (
          <div key={group.group}>
            <h3 className="mono muted">{group.group}</h3>
            <div className="chips">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
