import { ChatComponent, SidebarComponent } from '../components';

export function HomePage() {
  return (
    <div className='home'>
      <SidebarComponent />
      <ChatComponent />
    </div>
  );
}
