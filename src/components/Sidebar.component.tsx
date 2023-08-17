import { ChatsComponent, NavbarComponent, SearchComponent } from '.';
import { useUIStore } from '../store/UIStore';

export function SidebarComponent() {
  const { menuOpen } = useUIStore();
  return (
    <div className={`sidebar ${menuOpen ? `menu-open` : ''}`}>
      <NavbarComponent />
      <SearchComponent />
      <ChatsComponent />
    </div>
  );
}
