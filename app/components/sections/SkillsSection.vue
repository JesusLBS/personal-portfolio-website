<script setup lang="ts">
const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'Vue.js', icon: 'simple-icons:vuedotjs' },
      { name: 'Nuxt.js', icon: 'simple-icons:nuxtdotjs' },
      { name: 'React', icon: 'simple-icons:react' },
      { name: 'Angular', icon: 'simple-icons:angular' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Laravel', icon: 'simple-icons:laravel' },
      { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
      { name: 'Python', icon: 'simple-icons:python' },
      { name: 'Flask', icon: 'simple-icons:flask' },
      { name: 'REST APIs', icon: 'simple-icons:postman' },
      { name: 'PHP', icon: 'simple-icons:php' },
    ],
  },
  {
    title: 'Database & Cloud',
    skills: [
      { name: 'MySQL', icon: 'simple-icons:mysql' },
      { name: 'MongoDB', icon: 'simple-icons:mongodb' },
      { name: 'Azure', icon: 'simple-icons:microsoftazure' },
      { name: 'AWS', icon: 'simple-icons:amazonaws' },
    ],
  },
  {
    title: 'Tools & Workflow',
    skills: [
      { name: 'Git', icon: 'simple-icons:git' },
      { name: 'GitHub', icon: 'simple-icons:github' },
      { name: 'Bitbucket', icon: 'simple-icons:bitbucket' },
      { name: 'Postman', icon: 'simple-icons:postman' },
      { name: 'OpenAPI', icon: 'simple-icons:openapiinitiative' },
      { name: 'Docker', icon: 'simple-icons:docker' },
    ],
  },
];
</script>

<template>
  <section id="skills" class="border-b border-zinc-900 px-6 py-24">
    <div class="mx-auto max-w-7xl">
      <div class="mb-16">
        <p class="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">
          Skills
        </p>

        <h2 class="text-4xl font-bold text-white">
          Technologies & Tools
        </h2>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <article v-for="group in skillGroups" :key="group.title"
          class="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8">
          <h3 class="mb-8 text-xl font-semibold text-white">
            {{ group.title }}
          </h3>

          <div class="grid grid-cols-3 gap-4 sm:grid-cols-4">
            <div v-for="skill in group.skills" :key="skill.name"
              class="group flex flex-col items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 transition hover:border-zinc-600 hover:bg-zinc-900">
              <Icon :name="skill.icon" class="h-8 w-8 text-zinc-400 transition group-hover:text-white" />

              <span class="text-center text-xs text-zinc-400 group-hover:text-zinc-200">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>