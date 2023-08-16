export function SearchComponent() {
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type='text' placeholder='Jane...' />

        <div className='userChat'>
          <img
            src='https://images.pexels.com/photos/3323163/pexels-photo-3323163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt=''
          />

          <div className='userChatInfo'>
            <span>Jane</span>
          </div>
        </div>
      </div>
    </div>
  );
}
