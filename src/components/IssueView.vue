<template>
	<div v-if="show" class="issueWindow">
		<div class="mute" v-on:click.self="hideWindow"></div>
		<div class="issueContainer">
			<div v-bind:class="{hide:!loaded}">
				<div class="description">
					<div v-bind:class="['state',{ closed: issue.state && issue.state.toLowerCase() === 'closed' }]">{{issue.state}}</div>
					<strong>{{issue.title}}</strong>
					<p class="card-text">{{issue.bodyText}}</p>
					<hr>
					<strong>Comments({{issue.comments ? issue.comments.totalCount : "0"}})</strong>
					<ul class="comment-list" v-if="loaded">
						<Comment v-for="comment in issue.comments.nodes"
							v-bind:key="comment.id"
							v-bind:comment="comment" />
					</ul>
				</div>
			</div>
			<div v-bind:class="['not-found', {hide: loaded}]">
				<strong>
					Please wait..
				</strong>
			</div>
		</div>
	</div>
</template>

<script>
import Comment from "./Comment.vue";
export default {
	name: "IssueView",
	data() {
		return{
			some:"text",
			loaded:false,
			oldIssue:null,
		}
	},
	computed:{
		issue(){
			const {currentIssue} = this.$store.state
			if(currentIssue.state)
				this.toggleLoader(true)
			return currentIssue
		},
		show(){
			const {issueWindow} = this.$store.state
			this.toggleLoader(false)
			document.documentElement.style.overflow = issueWindow ? 'hidden' : 'auto'
			return issueWindow
		},
	},
	methods:{
		toggleLoader(flag){
			this.loaded=flag
		},
		hideWindow(){
      this.$store.commit('setIssueWindow',false)
		},
	},
  components: {
    Comment,
  },
};
</script>
