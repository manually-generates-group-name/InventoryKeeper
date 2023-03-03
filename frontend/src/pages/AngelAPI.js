import React from 'react';
import validator from 'validator';

class AngelAPI extends React.Component {

 handleSubmit = event => {
   if(validator.isEmail(this.input.value))
   {
     event.preventDefault();
     alert('Valid email:' + this.input.value);
     //<h1>Email is invalid</h1>;
   }
   else
     alert('Unvalid email: ' + this.input.value);//return<h1>Email is not valid</h1>;
 };

 render() {
   return (
     <form onSubmit={this.handleSubmit}>
       <label htmlFor="email">email</label>
       <input
         type="text"
         name="Email"
         defaultValue=""
         ref={(input) => this.input = input}
       />
     </form>
   );
 }
}

export default AngelAPI
