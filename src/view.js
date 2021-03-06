/**
 * @class View
 * @author Andrew Odri andrew@affirmix.com
 *
 * This class is the base view in TungstenJS. It provides a simple template property that can be overridden, and a render function that will chain any deferred responses.
 *
 * This view utilizes very basic template literals that are native to ECMAScript 6. This view is intended to be extended for use with other templating systems, for example `EJSView`, `MustacheView`, and `UnderscoreView` that are under development.
 */
export class View {
	/**
	 * @static
	 * @property {Class} classReference Reference to the current class
	 *
	 * This returns a reference that whatever the top-most sub-class is, which comes in handy when managing instances in static functions on classes that are designed to be extended.
	 */
	static get classReference() { return eval(this.name); }

	/**
	 * @property {Class} classReference Reference to the current class
	 *
	 * This returns a reference that whatever the top-most sub-class is, which comes in handy when managing instances in static functions on classes that are designed to be extended.
	 */
	get classReference() { return eval(this.constructor.name); }

	/**
	 * @static
	 * @param {Object} data This is data returned from the resolved promise in the render function
	 * @returns {String} String containing the the HTML render buy the temaplte based on the data provided in the data parameter
	 *
	 * This function is called by the render function, providing with the data that is returned from the resolved promise object. While the template is currently implemented as an ECMAScript 6 template literal, it could also just return a path if the render function has been implemented with a 3rd party renderer.
	 */
	static template(data) {
		console.log('View.template()');

		return ``;
	}

	/**
	 * @static
	 * @param {Object} request The request is a deferred object containing the data to be rendered by the view. Usually this is a deferred AJAX object returned by the model, but could be any appropriate object.
	 * @param {Object} selectors The CSS selectors for the elements that the rendered view HTML will be inserted into.
	 * @return {Object} Returns a deferred object containing the rendered view HTML after it has been applied to the template in the in the template function
	 *
	 * This function take care of managing the rendering of the view. The bulk of the logic should be stored in the function if it is to be overriden for a 3rd party renderer. This allows the template object to be as simple as possible, so that it be overridden with just a simple template or path for real world view implementations.
	 */
	static render(request, selectors = false) {
		console.log('View.render()');

		return new Promise((resolve, reject) => {
			request.then((data) => {
				let rendered = this.template(data);

				if(selectors){
					let elements = Array.from(document.querySelectorAll(selectors));

					for(let element of elements){
						element.innerHTML = rendered;
					}
				}

				resolve(rendered);
			}).catch((error) => reject(error));
		});
	}
}
