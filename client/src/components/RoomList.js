import React from 'react';

const RoomList = ({ rooms }) => {
  return (
    <div>
      {rooms.map((room) => (
        <div key={room.id}>
          <div class="col s12 m12">
            <div class="card horizontal">
              <div class="card-stacked">
                <div class="card-content">
                  <p>{room.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
