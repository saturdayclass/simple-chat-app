import React from 'react';

const RoomList = ({ rooms }) => {
  return (
    <div>
      {rooms.map((room) => (
        <div key={room.id}>
          <div className="col s12 m12">
            <div className="card horizontal">
              <div className="card-stacked">
                <div className="card-content">
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
