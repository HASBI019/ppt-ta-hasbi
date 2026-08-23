import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";

export default function UseCasePanel({ data, onOpen }) {
  return (
    <div className="usecase-layout">
      <motion.div
        className="usecase-image"
        initial={{ opacity: 0, scale: .96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <PlaceholderImage src={data.image} alt={data.title} />
        <button className="image-expand" onClick={onOpen}>
          <Maximize2 size={16} /> Perbesar Use Case
        </button>
      </motion.div>

      <div className="usecase-copy">
        <div className="eyebrow">{data.increment}</div>
        <h2>{data.title}</h2>
        <p className="lead">{data.intro}</p>

        <div className="explain-list">
          {data.points.map((point, i) => (
            <motion.div
              className="explain-item"
              key={point}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * .06 }}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <p>{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}