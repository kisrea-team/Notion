import Cookies from 'js-cookie'


function Test() {
    var props=Cookies.get('test');
    console.log(props)
    return (

        <div>
        </div>
    )

}
export default Test;