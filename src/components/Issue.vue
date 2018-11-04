<template>
	<li v-on:click="$emit('show',issue)">
		<div v-bind:class="['state',{ closed: issue.state && issue.state.toLowerCase() === 'closed' }]">{{issue.state}}</div>
		<strong>{{issue.title}}</strong>
		<p class="card-text">{{ truncate(issue.bodyText) }}</p>
	</li>
</template>

<script>
export default {
	name: "Issue",
	props: {
		issue: Object,
	},
	methods: {
		truncate(str) {
			if (str.length > 100) {
				return str.slice(0, 100) + "...";
			}

			return str;
		},
	},
};
</script>
