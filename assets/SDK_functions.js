// sdk CODES

async function whoAmI() {
    const sdk = await UA;
    const channelId = await sdk.channel.id()
    const optInStatus = await sdk.channel.optedIn()
    let user = {
      channel_id: channelId,
      optin_status: optInStatus
    }
    console.log(user);
  }
  
  async function createChannel() {
    const sdk = await UA
    const result = await sdk.create()
    console.log(`Channel created successfully. Your channel ID is: ${result['channelId']}`)
  }
  

async function promptWebPush() {
	const sdk = await UA;
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
						"Make sure you stay up to date with everything Airship sdk. Subscribe to notifications. We send about one per week.",
					accept: "Sign up now",
					deny: "So you're saying there's a chance.."
				}
			}
		}
	);
	plugin.prompt();
}

async function promptSmsForm() {
	const sdk = await UA;
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

	const plugin = await sdk.plugins.load(
		"subscription-form",
		"https://aswpsdkus.com/notify/v2/ua-subscription-form.min.js"
	);
	form = plugin.setupModalForm(options);
	form.open();
}

async function smsEmbeddedForm() {
    const embedTarget = document.querySelector("#sms_embedded")
    let options ={
        platform: "sms",
        size: "large",  
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
    }
    const sdk = await UA
    const plugin = await sdk.plugins.load("subscription-form", "https://aswpsdkus.com/notify/v2/ua-subscription-form.min.js")
    plugin.embedForm(embedTarget, options)
  }

async function promptEmailForm() {
	const sdk = await UA;
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

	const plugin = await sdk.plugins.load(
		"subscription-form",
		"https://aswpsdkus.com/notify/v2/ua-subscription-form.min.js"
	);
	form = plugin.setupModalForm(options);
	form.open();
}

async function emailEmbeddedForm() {
    const embedTarget = document.querySelector("#email_embedded")
    const sdk = await UA;
	let options = {
		platform: "email",
		size: "large",
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

	const plugin = await sdk.plugins.load(
		"subscription-form",
		"https://aswpsdkus.com/notify/v2/ua-subscription-form.min.js"
	);
    plugin.embedForm(embedTarget, options)
  }
  

async function associateNamedUser() {
	const sdk = await UA;
	const nuValue = document.querySelector("#nuid").value;
	const contact = await sdk.contact;
	await contact.identify(nuValue);
}

async function addTags() {
    const tagNU = document.getElementById("tagNU");
    const sdk = await UA;
	let editor;
	if (tagNU.checked) {
		const contact = await sdk.contact;
		editor = await contact.editTags();
	} else {
		const channel = await sdk.channel;
		editor = await channel.editTags();
	}
	const tagGroup = document.getElementById("tag-group").value;
	const tagString = document.getElementById("tag-name").value;
	let tagArray = tagString.split(",");
	tagArray = tagArray.map((tag) => tag.trim());
	for (let tag of tagArray) {
		editor.add(tagGroup, tag);
	}
	await editor.apply();
}

async function removeTags() {
	const tagNU = document.getElementById("tagNU");
    const sdk = await UA;
	let editor;
	if (tagNU.checked) {
		const contact = await sdk.contact;
		editor = await contact.editTags();
	} else {
		const channel = await sdk.channel;
		editor = await channel.editTags();
	}
	const tagGroup = document.getElementById("tag-group").value;
	const tagString = document.getElementById("tag-name").value;
	let tagArray = tagString.split(",");
	tagArray = tagArray.map((tag) => tag.trim());
	for (let tag of tagArray) {
		editor.remove(tagGroup, tag);
	}
	await editor.apply();
}

async function setTags() {
	const sdk = await UA;
	const tagNU = document.getElementById("tagNU");
	const tagGroup = document.getElementById("tag-group").value;
	const tagString = document.getElementById("tag-name").value;
	let tagArray = tagString.split(",");
	const trimmedTagArray = tagArray.map((tag) => tag.trim());
	if (tagNU.checked) {
		const contact = await sdk.contact;
		const editor = contact.editTags();
		await editor.set(tagGroup, trimmedTagArray).apply();
	} else {
		const channel = await sdk.channel;
		const editor = await channel.editTags();
		await editor.set(tagGroup, trimmedTagArray).apply();
	}
}

async function setAttrs() {
	const attrNU = document.getElementById("attrNU");
	const attrForm = document.querySelector("#attr-form");
	const sdk = await UA;
	const value = document.querySelector("#attr-name").value;
	const id = document.querySelector("#attr-id").value;
	if (attrNU.checked) {
		const contact = await sdk.contact;
		const editor = await contact.editAttributes();
		editor.set(id,value)
		await editor.apply();
	} else {
		const channel = await sdk.channel;
		const editor = await channel.editAttributes();
        editor.set(id,value)
		await editor.apply();
	}
}
