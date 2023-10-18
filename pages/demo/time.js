import React from 'react';
const style = {
   time: {
      backgroundColor: 'pink',
      borderRadius: 10,
      width: '50%',
   }
}
class GreetingMessage extends React.Component {
   constructor() {
      super();
      this.state = {
         message: ''
      };
   }

   componentDidMount() {
      this.updateGreetingMessage();
      // 每隔一分钟检查一次时间并更新消息
      this.interval = setInterval(this.updateGreetingMessage, 60000);
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   updateGreetingMessage = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      let message = '';

      if (currentHour >= 0 && currentHour < 8) {
         message = '早上好！';
      } else if (currentHour >= 8 && currentHour < 12) {
         message = '上午好！';
      }
      else if (currentHour >= 12 && currentHour < 18) {
         message = '下午好！';
      } else {
         message = '晚上好！';
      }

      this.setState({ message });
   };


   render() {
      return (
         <div>
            <h1 style={style.time}>{this.state.message}</h1>
         </div>
      );
   }
}

export default GreetingMessage;
