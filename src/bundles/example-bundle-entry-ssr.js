import ReactMPAR from '../ReactMPAR-SSR';
import dictionary from '../dictionaries/example-ssr';

export default function(document, callback=()=>{}) {
	 console.log("HI FROM SSR");

   const renderer=new ReactMPAR(".test_class_name",dictionary,document);

	 renderer.renderAll(callback);
}
