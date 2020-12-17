import React from 'react';

function Chatbox(props) {

  document.querySelector("#exampleForm2").addEventListener("keypress", function(e) {
    const $eTargetVal = document.querySelector(e.target).value;
    
    if (e.keyCode === 13 && $eTargetVal.length > 0) {
      const text = `
      <div class="card bg-primary rounded w-75 float-right z-depth-0 mb-1 last"                    >
        <div class="card-body p-2">
                <p class="card-text text-white">${$eTargetVal}</p>
        </div>
       </div>`;

      document.querySelector(text).insertAfter(".last:last");
      document.querySelector(this.value);
    }
  });
  return (
    <>
     <div class="container mt-5">
    {/*Grid row*/}
<div class="row d-flex flex-row-reverse">
    {/*Grid column*/}
  <div class="col-md-6 mb-4 d-flex flex-row-reverse">

    <div class="card chat-room small-chat wide" id="myForm">
      <div class="card-header white d-flex justify-content-between p-2" id="toggle" style="cursor: pointer;">
        <div class="heading d-flex justify-content-start">
       
          <div className="room-chat-header">
            <p className="room-chat"><strong>Room Chat</strong></p>
          </div>
        </div>
        <div className="close-icon">
          <a id="closeButton"></a>
        </div>
      </div>
      <div class="my-custom-scrollbar" id="message">
        <div class="card-body p-3">
          <div class="chat-message">
            <div class="media mb-3">
              <div class="media-body">
              </div>
            </div>
            <div class="card bg-primary rounded w-75 float-right z-depth-0 mb-1">
              <div class="card-body p-2">
                <p class="card-text text-white">Test 1</p>
              </div>
            </div>
            <div class="card bg-primary rounded w-50 float-right z-depth-0 mb-2">
              <div class="card-body p-2">
                <p class="card-text text-white">Test 2</p>
              </div>
            </div>
            <div class="card bg-light rounded w-75 z-depth-0 mb-1 message-text">
              <div class="card-body p-2">
                <p class="card-text black-text">Test 3</p>
              </div>
            </div>
            <div class="d-flex justify-content-start">
              <div class="card bg-light rounded w-75 z-depth-0 mb-2">
                <div class="card-body p-2">
                  <p class="card-text black-text">Test 4</p>
                </div>
              </div>
            </div>
            <div class="card bg-primary rounded w-75 float-right z-depth-0 mb-1 last">
              <div class="card-body p-2">
                <p class="card-text text-white">Test 5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted white pt-1 pb-2 px-3">
        <input type="text" id="exampleForm2" class="form-control" placeholder="Type a message..."/>
      </div>
    </div>
  </div>
</div>
{/*Grid column end*/}
</div>
{/*Grid row end */}
    </>
  );
}

export default Chatbox;
