import React from 'react';

const Message = ({ data, userId }) => {
  return (
    <>
      {data.map((message, i) => {
        let isCurrentUser = false;
        if (userId === message.user_id) {
          isCurrentUser = true;
        }
        return (
          <div key={i}>
            {isCurrentUser ? (
              <div className="row right-align">
                <div className="col s12 m8 16 right">
                  <p className="sendByMe">
                    {message.name} :{message.text}
                  </p>
                </div>
              </div>
            ) : (
              <div className="row left-align">
                <div className="col s12 m8 16 right">
                  <p className="opponent">
                    {message.name} :{message.text}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Message;
