<template>
	<section>
		<h3>Nav</h3>
		<ul>
			<li>1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
		</ul>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<el-form-item>
					<el-input v-model="apple" placeholder="姓名1"></el-input>
					</el-form-item>
					<el-form-item>
					<el-input v-model="banana" placeholder="姓名2"></el-input>
					</el-form-item>
					<el-form-item>
					<el-input v-model="orange" placeholder="姓名3"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getUsers">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleAdd">新增</el-button>
					</el-form-item>
				</el-form>
		</el-col>
	<section>
</template>