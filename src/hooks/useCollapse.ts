import { useContext } from 'react';
import { CollapseSideBarContext } from '../contexts/CollapseSideBarContext';

export default function useCollapse() {
  const context = useContext(CollapseSideBarContext);

  if (!context) throw new Error('Setting context must be use inside CollapseSideBarProvider');
  return context;
}
