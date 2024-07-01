// SDK CODES

// Log who you are in the console
async function whoAmI() {
    const sdk = await UA
	const channel = await sdk.channel.id()
    console.log(channel)
}



async function promptRegistration() {
    const sdk = await UA
	// UA.then((sdk) => {
	// 	sdk.plugins
	// 		.load(
	// 			"html-prompt",
	// 			"https://aswpsdkus.com/notify/v2/ua-html-prompt.min.js",
	// 			{
	// 				appearDelay: 0,
	// 				askAgainDelay: 0,
	// 				type: "alert",
	// 				position: "top",
	// 				i18n: {
	// 					en: {
	// 						title: "Lets keep in touch",
	// 						message:
	// 							"Make sure you stay up to date with everything Airship SDK. Subscribe to notifications. We send about one per week.",
	// 						accept: "Sign up now",
	// 						deny: "So you're saying there's a chance.."
	// 					}
	// 				}
	// 			}
	// 		)
	// 		.then((plugin) => {
	// 			plugin.prompt();
	// 		})
	//     });
	;
	const plugin = await sdk.plugins.load(
		"html-prompt",
		"https://aswpsdkus.com/notify/v2/ua-html-prompt.min.js",
		{
			appearDelay: 0,
			askAgainDelay: 0,
			type: "alert",
			position: "top",
			i18n: {
				en: {
					title: "Lets keep in touch",
					message:
						"Make sure you stay up to date with everything Airship SDK. Subscribe to notifications. We send about one per week.",
					accept: "Sign up now",
					deny: "So you're saying there's a chance.."
				}
			}
		}
	);
	plugin.prompt();
}
.
async function prompt_sms_form() {
    const sdk = await UA
    let options = {
		platform: "sms",
		// automatic: {
		// 	askAgainDelay: 0
		// },
		i18n: {
			en: {
				terms: "These are terms that you agree to.",
				footer: "This here be a footer",
				placeholderMsisdn: "1360-867-5309",
				submitButton: "Receive Texts",
				invalidMsisdn: "Whoops, that number wasn't valid. Please try again"
			}
		},
		senderId: "63706",
		country: "US"
	};
    
    const plugin = await sdk.plugins.load("subscription-form", "https://aswpsdkus.com/notify/v2/ua-subscription-form.min.js")
    form = plugin.setupModalForm(options)
    form.open()

    // })
}

async function prompt_email_form() {
	let options = {
		platform: "email",
		size: "large",
		automatic: {
			askAgainDelay: 0
		},
		i18n: {
			en: {
				terms: "These are terms that you agree to.",
				footer: "This here be a footer",
				placeholderEmail: "support@airship.com",
				submitButton: "Receive Emails",
				invalidEmail: "Whoops, that email wasn't valid. Please try again"
			}
		},
		senderId: "63706",
		country: "US"
	};
    
    const plugin = await sdk.plugins.load("subscription-form", "https://aswpsdkus.com/notify/v2/ua-subscription-form.min.js")
    form = plugin.setupModalForm(options)
    form.open()
}

async function associateNamedUser() {
    const sdk = await UA
    const nuValue = document.querySelector("#nuid").value
    const contact = await sdk.contact
    contact.identify(nuvalue)
}

function addTags() {
	const tagNU = document.getElementById("tagNU");

	if (tagNU.checked) {
		// Add SDK codes to add tags on Named User
	} else {
		// Add SDK codes to add tags on Channel
	}
}

function removeTags() {
	const tagNU = document.getElementById("tagNU");

	if (tagNU.checked) {
		// Add SDK codes to remove tags on Named User
	} else {
		// Add SDK codes to remove tags on Channel
	}
}

function setTags() {
	const tagNU = document.getElementById("tagNU");

	if (tagNU.checked) {
		// Add SDK codes to set tags on Named User
	} else {
		// Add SDK codes to set tags on Channel
	}
}

function setAttrs() {
	const attrNU = document.getElementById("attrNU");
    console.log('wow')
	if (attrNU.checked) {
		// Add SDK codes to set attributes on Named User
	} else {
		// Add SDK codes to set attributes on Channel
	}
}
