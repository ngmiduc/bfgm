<template>
  <div class="impress">
    <a-typography-title :level="2">Büro für gute Maßnahmen</a-typography-title>

    <a-row :gutter="32" type="flex" justify="center" align="top">
      <a-col :xs="24" :sm="8" :md="6" :lg="4" :xl="4">
        <a-typography-title :level="4">Anschrift</a-typography-title>
        <a-typography-paragraph>
          Büro für gute Maßnahmen e.V.<br />
          Jordan Strasse 9<br />
          01099 Dresden<br />
          Germany
        </a-typography-paragraph>
      </a-col>

      <a-col :xs="24" :sm="8" :md="6" :lg="4" :xl="4">
        <a-typography-title :level="4">Kontakt</a-typography-title>
        <a-typography-paragraph>
          hi@bfgm.eu
        </a-typography-paragraph>
      </a-col>

      <a-col :xs="24" :sm="8" :md="6" :lg="4" :xl="4">
        <a-typography-title :level="4"
          >gesetzliche Vertretung
        </a-typography-title>
        <a-typography-paragraph
          >Jessica Beck<br />
          Joseph Walther<br />
          Frida Volmer<br />
          Simon Garbe<br />
          Minh Duc Nguyen<br
        /></a-typography-paragraph>
      </a-col>

      <a-col :xs="24" :sm="8" :md="6" :lg="4" :xl="4">
        <a-typography-title :level="4">Register</a-typography-title>
        <a-typography-paragraph>
          Registergericht: Dresden<br />
          Vereinsregister: VR 11706<br />
          Steuernummer: 202/140/20565
        </a-typography-paragraph>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "pages-impress"
}
</script>

<style scoped lang="scss">
.impress {
  text-align: center;
  padding-bottom: 300px;
  padding-top: 40px;
}
</style>
