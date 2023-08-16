import { ChatsComponent, NavbarComponent, SearchComponent } from '.';

export function SidebarComponent() {
  return (
    <div className='sidebar'>
      <NavbarComponent />
      <SearchComponent />
      <ChatsComponent />
    </div>
  );
}
