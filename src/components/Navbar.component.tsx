export function NavbarComponent() {
  return (
    <div className='navbar'>
      <span className='logo'>Chat App</span>

      <div className='user'>
        <img
          src='https://images.pexels.com/photos/4709288/pexels-photo-4709288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt=''
        />
        <span>Luis B</span>
        <button type='button'>Salir</button>
      </div>
    </div>
  );
}
