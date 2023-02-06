<script>
export default {
  name: "pages-impress",
};
</script>

<template>
  <footer class="impress">
    <h2>Büro für gute Maßnahmen</h2>

    <div class="box">
      <div>
        <h3>Anschrift</h3>
        <p>
          Büro für gute Maßnahmen e.V.<br />
          Jordan Strasse 9<br />
          01099 Dresden<br />
          Germany
        </p>
      </div>

      <div>
        <h3>Kontakt</h3>
        <p>hi@bfgm.eu</p>
      </div>

      <div>
        <h3>gesetzliche Vertretung</h3>
        <p>
          Helen Steiner<br />
          Jakop Reck<br />
          Minh Duc Nguyen<br />
        </p>
      </div>

      <div>
        <h3>Register</h3>
        <p>
          Registergericht: Dresden<br />
          Vereinsregister: VR 11706<br />
          Steuernummer: 202/140/20565
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.impress {
  text-align: center;
  padding-bottom: 300px;
  padding-top: 40px;
}

.box {
  padding: 0 40px;

  display: flex;
  > div {
    flex: 1;
  }
}
</style>
