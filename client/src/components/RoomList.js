import React from 'react';
import { Link } from 'react-router-dom';

const RoomList = ({ rooms, isLoading }) => {
  return (
    <div>
      {isLoading === false ? (
        <>
          {rooms.length > 0 ? (
            <>
              {rooms.map((room) => (
                <Link to={`/chat/${room._id}/${room.name}`} key={room._id}>
                  <div>
                    {console.log(room)}
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
                </Link>
              ))}
            </>
          ) : (
            'Belum ada room'
          )}
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default RoomList;
