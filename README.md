## $imple Event: Javascript framework for Event Management
## $impleEvent is simple javascript Event Management framework(EMF) for  event management in browser. It has a single object "$impleEvent" through which it proccesses every functionality.
### There are two main area in Simple Event:
#### 1) You provide event attibute to your html element, where you can define event-type, callback for handling event, optional arguments which all mention in arrow function format, where argument is eg.
```html
<button event="click=>openModal(,id)">Open Modal</button>//(,argument) or (e,argument)

<button event="click=>closeModal(,id) click=>alert()">close</button>
```
###### Here you proving a callback function "openModal and closeModal" for event type "click" on above element.You can provide muliple events just seperating it with ',' or space.ie 
```html
<button event="click=>showForm() , dblclick=>fillForm()">Test</button>
```

#### 2) Once you declare event attribute with atleast event type and callback function, second thing you do is register callback using $impleEvent.register(); or $impleEvent.add(); method. 

```javascript
    $impleEvent.add("openModal", function(e,id){
        //where e is event;
        document.getElementById(id).style.display="block";

      })
      .add("closeModal", function(e,id){
          if(confirm("Are you sure want to close ?")){
            document.getElementById(id).style.display="none";
          }

        });
```
## Return and Capaturing Return 
### Whenever the eventhandler  return value other then  function, you can capuring them  and embed in your HTML document.
For Example:
Lets suppose you have a Subscribe field .

```html
......
<div class="subscribe">
  <input event="change=>validate(,email)">
  <span class="return help"></span>
</div>
......
```





```javascript
$impleEvent.add('validate',function(e,field){
        var match={
          email:{
            test:/^\w+@+?\.$/,
            message:"Please Povide Valid email Address"
          },
          date:{
            test:/some-regex/,
            message:'Date format not supported, Please use date after 2010 in dd/mm/yyyy format',
          }
        }
        if(this.value.match(match[field])){
          this.parentElement.classList.remove('c_danger');
          this.parentElement.classList.add('c_success');

          return ' ';
        }else{
          
          this.parentElement.classList.remove('c_danger');
          this.parentElement.classList.add('c_danger');
          
          return match[field].message;
        }
      });
```
#### Here we have few things to note, every callback function is bind to the event target element where event attribute is define , we can access the element via "this" inside the callback function.
The first argument of callbacks will be always "event".
You can caputure the returns inside a html element with "return" class name. Returns must be either, string, number or Html element. If you want to return more than single data, you can use object as above. And when you required to send list of data which can be looped you can use array as a return. 

When you just return data from your callback it search for a element with class name "return"  by queryselector form its parentElement of your current event target element to embed your return. You should alway use empty element with class name "return " as  a place holder for return element to embed, however you can also append the return data if you desire to so by adding 'data-append' attribute on the placeholder element .

### Return String, Number and HTML;
##### You can return string , number or HTML simply returning it from callback function.
Note:There is $imple.createElement(TagName,{//attribute}) helper function to create element, as show in example below. when element is appended by returning it automatically update the event status of newly attached html element.  
```html
......
<div class="box">
  <h2 >You are fan of<span class="return"> click or double click the button</span> </h2>
  <button event="click=>getName(Hary Poter) dbclick=>getName(John,show)">Click to know ?</button>
</div>

<div class="box">
  <input class="input" data-get="task" required>
  <button event="click=>addTask">+Add a Task</button>
  <ul  class="return" data-append>
    <li class="task-head">Your Task</li>
  </ul>
</div>

......
```

```javascript
$impleEvent.add('getName',function(e,a,b){
        if(e.type=='dblclick') e.removeEventListener();
      return a+" "+b;
  });

$impleEvent.add('addTask',function(e){
  var input =$impleEvent.getData(document.getElementById('task-input'));
  if(input.task){
    return $impleEvent.createElement("li",{
      class:"list-item",
      text:input.task,
    });
  }
});
```
### Returning Dynamic content using object and Array
#### Returning object i.e {}
With the help of data-feed attribute we can emebed content dynamically.
For Example:-
```html
<div class="contact-card">
  <ul>
    <li> Name: <span class="return" data-feed="name"></span></li>
    <li> Gender: <span class="return" data-feed="sex"></span></li>
    <li> Mobile: <span class="return" data-feed="contact"></span></li>
    <li> Address: <span class="return" data-feed="address"></span></li>
  </ul>
  <button event="click=>getProfile">Get Profile</button>
  
</div>
```

```javascript
$impleEvent.add('getProfile',function(e){
    return {
      name:$impleEvent.createElement('span',{event:'click=>log(,"King of the North"', text:'John Snow'}),
      sex:'Male',
      contact:"+19990099900",
      address:"King of North, Games of thrones, House of Stark, Winterfell"
    };
});

$impleEvent.add('log', function(e,a){
  console.log(a);

});
```
Note:Whenever your returns cpntains html element , it will update and attach a event if specified using event attribute as show in above.

The 'data-feed' , attribute will hold the key of the object which value should be embeded in return holder, the holder most conatin 'return' class name regardless of  wheather 'data-feed' attribute is provide or not.
The when return is not an object, the return holder will not affected by static return if the holder has 'data-feed' attribute; 

### Returning Array 
##### Handling array data type is little bit tricky.
The Holder for array returns are diffrent from normal holder, the holder should contain 'data-component' attribute and set to selector which will be used as template. The template element should follow general holder requirement such classname "return" and attribute "data-feed". For example:-
```html
<div class="array-example">
  <ul  id="ul" data-append data-component="li">
    <li id="li"  class=""><span event="click=>return(,'Hello')" class="return c_nred" ></span>Component</li>
  </ul>
  <button event="click_getCountry" >Get list of countries</button>
</div>
```
```javascript
$impleEvent.add('getCountry',function(e){

    return ['USA', 'UK', 'Canada', 'France', 'Japan', $impleEvent.html('<a href="#" class="link" >Australia</a>')];
  });

```
Whenever array is returned from callback, it will first check for element with   attribute"data-component" in its parentElement scope, and its value is used as query selector for template element, the template element then converted to template and for each item in array, an instance of template is appended to the element with appropriate embeded item data.

Each item of array can hold data type of string, Number, HTML or Object but array.


### Scope of returns
##### By default scope of return to embed is limited to parent scope, that means it only looks for holder from one level up in DOM Tree. i.e parentNode of element where event will occurs. But you can change scope to global or specific element. Note: No matter where once scope is specified, it will take  each and every child elements under its scope coverage in DOM Tree.

#### Global scope
You can change scope from root in DOM by 'global' key.

```javascript
$impleEvent.add('returnData',function(e){

    return {
      global:{
        name:'John snow'
      }
    }
  });

```

#### Returing to specific element
Similarly, by using 'returnTo' key you can change return capture scope to specific element.

$impleEvent.add('returnData',function(e){

    return {
      returnTo:{
        'el':document.getElementById('id'),
        data:{
          name:'John snow',
          'Year':'From 2006'
        }
        }
    }
  });


### interval and timeout event
#### Apart from regular event, you can use setTimeout and setInterval as regular event, using timeout and interval respectively  in event attribute. For Example
```html
<div class="Time float-right">
    <h2 event="interval=>updateTime(,100)" class="return show-time">00:00:00</h2>
</div>
<div class="Time">
  <h2 event="timeout=>updateTime(,100)" class="return show-time"></h2>
  <button event="click=>updateTime">Show Lastest Time</button>
</div>
```
```javascript
$impleEvent.add('updateTime',function(e){
      //Note:Here 'e' is event or setInterval\setTimout instance depending on its event caller.
          var date=new Date();
          return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
        });
```
Here incase of interval and timout we always pass first argumnet a time in ms in our event attribute , , also note how we can reuse our callback function  in diffrent cases. Incase of interval and timeout the first argument in your call back is the intervel or timeout in case you want to clearTimout or clearInterval.












