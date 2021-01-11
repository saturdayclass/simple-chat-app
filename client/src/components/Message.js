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
          <>
            {isCurrentUser ? (
              <div key={i} className="row right-align">
                <div class="col s12 m8 16 right">
                  <p className="sendByMe">
                    {message.name} :{message.text}
                  </p>
                </div>
              </div>
            ) : (
              <div key={i} className="row left-align">
                <div class="col s12 m8 16 right">
                  <p className="opponent">
                    {message.name} :{message.text}
                  </p>
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
};

export default Message;
