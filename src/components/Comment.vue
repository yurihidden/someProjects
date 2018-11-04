<template>
	<li>
		<strong>{{comment.author.login}}</strong>
		<p>{{comment.bodyText}}</p>
	</li>
</template>

<script>
export default {
	name: "Comment",
	props:{
		comment:Object,
	},
};
</script>
