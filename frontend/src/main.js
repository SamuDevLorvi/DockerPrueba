import { createApp, ref, onMounted } from "vue";

const App = {
	setup() {
		const message = ref("Cargando...");
		onMounted(async () => {
			console.log("HI");
			const res = await fetch("http://localhost:3000/");
			console.log("res", res);
			const data = await res.json();
			message.value = data.message;
		});
		return { message };
	},
	template: `<h1>{{ message }}</h1>`,
};

createApp(App).mount("#app");
