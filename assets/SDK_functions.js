// SDK CODES

// Log who you are in the console
async function whoAmI() {
	const sdk = await UA;
	const channel = await sdk.channel.id();
	console.log(channel);
}

async function promptRegistration() {
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
						"Make sure you stay up to date with everything Airship SDK. Subscribe to notifications. We send about one per week.",
					accept: "Sign up now",
					deny: "So you're saying there's a chance.."
				}
			}
		}
	);
	plugin.prompt();
}

async function prompt_sms_form() {
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

async function prompt_email_form() {
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

async function associateNamedUser() {
	const sdk = await UA;
	const nuValue = document.querySelector("#nuid").value;
	const contact = await sdk.contact;
	const result = await contact.identify(nuValue);
}

async function addTags() {
	let editor;
	const tagNU = document.getElementById("tagNU");
	const tagGroup = document.getElementById("tag-group").value;
	const tagString = document.getElementById("tag-name").value;
	let tagArray = tagString.split(",");
	tagArray = tagArray.map((tag) => tag.trim());
	const SDK = await UA;
	for (let tag of tagArray) {
		if (tagNU.checked) {
			const contact = await SDK.contact;
			editor = contact.editTags();
			result = await editor.add(tagGroup, tag)
		} else {
			const channel = await SDK.channel;
			editor = channel.editTags();
			await editor.add(tagGroup, tag)
		}
	}
    editor.apply()
}

async function removeTags() {
	const tagNU = document.getElementById("tagNU");
	const tagGroup = document.getElementById("tag-group").value;
	const tagString = document.getElementById("tag-name").value;
	let tagArray = tagString.split(",");
	tagArray = tagArray.map((tag) => tag.trim());
	const SDK = await UA;
	for (let tag of tagArray) {
		if (tagNU.checked) {
			const contact = await SDK.contact;
			const editor = await contact.editTags();
            await editor.remove(tagGroup, tag).apply()
		} else {
			const channel = await SDK.channel;
			const editor = await channel.editTags();
            await editor.remove(tagGroup, tag).apply()
		}
	}
}

async function setTags() {
	const SDK = await UA;
	const tagNU = document.getElementById("tagNU");
	const tagGroup = document.getElementById("tag-group").value;
	const tagString = document.getElementById("tag-name").value;
	let tagArray = tagString.split(",");
	const trimmedTagArray = tagArray.map((tag) => tag.trim());
	if (tagNU.checked) {
		const contact = await SDK.contact;
		const editor = contact.editTags();
        await editor.set(tagGroup, trimmedTagArray).apply();
	} else {
		const channel = await SDK.channel;
		const editor = await channel.editTags();
		await editor.set(tagGroup, trimmedTagArray).apply();
	}
}

async function setAttrs() {
	const attrNU = document.getElementById("attrNU");
	const attrForm = document.querySelector("#attr-form");
	const SDK = await UA;
	const fnValue = document.querySelector("#first_name").value;
	const lnValue = document.querySelector("#last_name").value;
	const tierValue = document.querySelector("#loyalty_tier").value;
	let valueList = {
		first_name: fnValue,
		last_name: lnValue,
		loyalty_tier: tierValue
	};
	for (let value of Object.keys(valueList)) {
		if (valueList[value] == "") {
			delete valueList[value];
		} else if (valueList[value] == "null") {
			valueList[value] = "";
		}
	}
	if (attrNU.checked) {
		const contact = await SDK.contact;
		const editor = await contact.editAttributes();
		for (let key of Object.keys(valueList)) {
			editor.set(key, valueList[key]);
		}
		await editor.apply();
	} else {
		const channel = await SDK.channel;
		const editor = await channel.editAttributes();
		for (let key of Object.keys(valueList)) {
			editor.set(key, valueList[key]);
		}
		await editor.apply();
	}
}
