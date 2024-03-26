import { motion, useAnimate, stagger } from "framer-motion";
import { useContext, useRef, useState } from "react";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [scope, animate] = useAnimate();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      //* this is the impertive way to configure animations using framer motion
      animate(
        "input, textarea", //* CSS selector
        { x: [-10, 0, 10, 0] }, //* animation configuration
        { type: "spring", duration: 0.2, delay: stagger(0.05) } //* transition configuration
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      {/* by adding ref={scope} this will apply animation configured in animate function to selected element inside this form only */}
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }, //* we can use the same variant identefire for all its children with different configurations
          }}
          id="new-challenge-images"
        >
          {images.map((image) => (
            /* this is a nested framer motion element because one of its parents is a framer motion element, this means this element animation will excute after its parent animation finishes
             * Note: this nested framer motion element will by default take its framer motion parent element's props in case I didn't override them here */
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: {
                  opacity: 1,
                  scale: [0.8, 1.3, 1], //* can use key frames like this as an array of steps
                },
              }}
              exit={{ opacity: 1, scale: 1 }} //* this will not apply any animation here because we are allready in visible state, but you mostn't use the variant because it will cause a conflects (meight fixed in the future)
              transition={{ type: "spring" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
