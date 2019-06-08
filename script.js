     //CREATED AN ARRAY FOR USER INPUT
     const inputs = localStorage.getItem('postStorage')  ||[];

      //post ID
     let id = 1;


  //ADDED AN EVENT LISTENER TO THE SUBMIT BUTTON
  const submitButton = document.getElementById('button').addEventListener('click' , buttonEvent);
      //function to call when the submit button is clicked
    function buttonEvent(e){

        e.preventDefault();
      const postImage = document.getElementById('image').value;
      const postTitle = document.querySelector('[name=title]').value;
      const postDate = document.querySelector('[name=date]').value;
      const postContent = document.querySelector('textarea').value;
      const postCategory = document.querySelector('[name=category]').value;

        //checking if the inputs are empty
    if(postImage === '' ||postTitle === '' || postContent === '' || postDate === '' || postCategory === ''){
        //created a warning [DIV]
      const warningDiv = document.createElement('div');
         warningDiv.innerHTML = `<p><i class="fas fa-exclamation-triangle"></i> please fill out all <u>fields</u></p>`;
         document.querySelector('#h3').appendChild(warningDiv);
         warningDiv.classList.add('diverror');

        //function that removes the warning div when the user inputs data
    function removeWarning(){
        warningDiv.style.display = 'none'
      }
        document.getElementById('image').addEventListener('input' , removeWarning);
        document.getElementById('text').addEventListener('input', removeWarning);
        document.getElementById('myDate').addEventListener('input', removeWarning);
        document.getElementById('category').addEventListener('input', removeWarning);
        document.getElementById('textArea').addEventListener('input', removeWarning);
     }else{
       //save the inputs into an object
    const input = {
       id : id++,
       image : postImage,
       title : postTitle,
       category : postCategory,
       Date : postDate,
       content : postContent
     }
       //pushing the object into the [input] array
    inputs.push(input);
       //clear the inputs in the form after the user has sent the data
    document.getElementById('form').reset();

    //storing the posts in a local storage
    postStorage = JSON.stringify(inputs);
    localStorage.setItem('postStored' , postStorage);

    //getting the data from local storage
    getPosts = localStorage.getItem('postStored');
    const postValues = JSON.parse(getPosts);

     //created a div for the new post
    const postDiv = document.createElement('div');
     //inserting the users data into the new post
     postValues.map(e => {
       postDiv.innerHTML = `
                           <img src="${e.image}" style="width :100% , height: 30%">
                           <h3><span class="posttitle">${e.title}</span></h3>
                           <i class="far fa-clock">&nbsp;${e.Date}</i>
                           <br>
                           <span style="color: #f27b13;">${e.category}</span>
                           <br>
                           <p>${e.content}</p>`});

   console.table(postValues);
      //added a style to the new post
    postDiv.classList.add('javascriptBlog');

      //Created a span for delete post option
    const deletePost = document.createElement('span');
     deletePost.textContent = 'Delete post';
     deletePost.classList.add('deletePost');
     postDiv.appendChild(deletePost);

      //to delete the post
     deletePost.onclick = removePost;
     document.querySelector('#last-post').insertAdjacentElement('afterend' , postDiv);
   }};

     //function to call to remove the post
    function removePost(e){
     e.target.parentElement.style.display = 'none';
    }
     console.table(inputs);

      //            [1 ISSUE]
      //i am not getting the data from the local storage when the page reloads
      // the issue is from this code [ const inputs = localStorage.getItem('postStorage')  ||[]; ]