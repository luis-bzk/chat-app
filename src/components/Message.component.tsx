export function MessageComponent() {
  return (
    <div className='message owner'>
      <div className='messageInfo'>
        <img
          src='https://images.pexels.com/photos/3323163/pexels-photo-3323163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt=''
        />

        <span>Just now</span>
      </div>
      <div className='messageContent'>
        <p>hello</p>
        <img
          src='https://images.pexels.com/photos/3323163/pexels-photo-3323163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt=''
        />
      </div>
    </div>
  );
}
