<template>
    <div class="repository-view-tab">
      <div class="repository-sidebar">
        <input type="text" placeholder="Filter" v-model="filterName" class="form-control">
        <ul class="repository-list">
          <strong v-on:click="check()">Repositories:</strong>
          <li
            v-for="repository in filteredRepos"
            v-bind:key="repository.id"
            v-bind:class="{ selected: repository === selectedRepository }"
            v-on:click="setSelectedRepository(repository)"
          >
            {{ repository.nameWithOwner }}
          </li>
        </ul>
      </div>
      <div class="content"> 
        <h2>{{ selectedRepository && selectedRepository.name}} issues</h2>
        <ul class="issues" v-if="loaded">
          <Issue 
            v-for="issue in issues"
            v-bind:key="issue.number"
            v-bind:issue= "issue"
            v-on:show="showIssue"
            />
        </ul>
        <div class="not-found" v-else>
          <strong>
            Please wait..
          </strong>
        </div>
      </div>
    </div>
</template>

<script>
import Issue from "./Issue.vue";
import queries from "../api/queries.js"
export default {
  name: "RepositoryView",
  data(){
    return{
      filterName:"",
      loaded:false,
      selectedRepository:null,
      firstLoad:true,
    }
  },
  computed:{
    repositories(){
      const {reposWithIssues} = this.$store.getters
      if(!this.selectedRepository && reposWithIssues.length)
        this.setSelectedRepository(reposWithIssues[0])
      return reposWithIssues
    },
    filteredRepos(){
      return this.repositories.filter((rep)=>{
        return rep.nameWithOwner.toLowerCase().includes(this.filterName.toLowerCase())
      })
    },
    issues(){
      return this.$store.state.issues
    },
  },
  components: {
    Issue,
  },
  methods:{
    setSelectedRepository(value){
      if(value){
      this.loaded=false
      this.selectedRepository=value
      queries.getIssues(value.owner.login, value.name).then((res)=>{
        this.$store.commit('setIssues',res);
        this.loaded=true
      })
      }
    },
    showIssue(issue){
      const rep = this.selectedRepository
      this.$store.commit('setIssueWindow',true)
      queries.getIssue(rep.owner.login, rep.name, issue.number).then((res)=>{
        this.$store.commit('setIssue',res);
      })
    },
  }
}
</script>
