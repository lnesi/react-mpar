import ReactMPAR from '../ReactMPAR-SSR';
import dictionary from '../dictionaries/example-ssr';

export default function(document, callback=()=>{}) {
   const renderer=new ReactMPAR(".test_class_name",dictionary,document);
	 renderer.renderAll(callback);
}
