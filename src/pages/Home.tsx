import { ChatComponent, SidebarComponent } from '../components';

export function HomePage() {
  return (
    <div className='home'>
      <div className='container'>
        <SidebarComponent />
        <ChatComponent />
      </div>
    </div>
  );
}
