import {motion} from 'framer-motion'
import Badge from './Badge.jsx';

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect}
      >
        {children}
        {/* by adding this key={badgeCaption} to a component that uses framer motion elements, it will asign a dynamic key for the component and this will recreate and rerender this component and rerun any animations inside it */}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {/* by adding layoutId='tab-indicator' to this div which represents the under tab line framer motion will add a smooth animation for all elements with this layoutId */}
      {isSelected && <motion.div layoutId='tab-indicator' className="active-tab-indicator" />}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === 'failed'}
          onSelect={() => onSelectType('failed')}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
