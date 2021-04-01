<template>
  <div class="impress">
    <h1>Büro für gute Maßnahmen</h1>

    <footer>
      <section>
        <h4>Anschrift</h4>
        <p>
          Büro für gute Maßnahmen e.V.<br />
          Jordan Strasse 9<br />
          01099 Dresden<br />
          Germany
        </p>
      </section>

      <section>
        <h4>Kontakt</h4>
        <p>
          hi@bfgm.eu
        </p>
      </section>

      <section>
        <h4>gesetzliche Vertretung</h4>
        <p>Jessica Beck<br /></p>
        <p>Joseph Walther<br /></p>
        <p>Frida Volmer<br /></p>
        <p>Simon Garbe<br /></p>
        <p>Minh Duc Nguyen<br /></p>
      </section>

      <section>
        <h4>Register</h4>
        <p>
          Registergericht: Dresden<br />
          Vereinsregister: VR 11706<br />
          Steuernummer: 202/140/20565
        </p>
      </section>
      <section>
        <h4>Support</h4>
        <p>
          <span class="support-item">
            <img
              width="30"
              src="@/assets/notion-logo/notion-logo-no-background.png"
              alt="logo"
            />
          </span>
        </p>
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  name: "pages-impress"
}
</script>

<style scoped lang="scss">
.impress {
  padding: 50px 0px;
  text-align: center;

  .support-item {
    display: flex;
    align-items: center;

    @media (max-width: 1150px) {
      justify-content: center;
    }

    img {
      margin-right: 4px;
    }
  }

  footer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    section {
      text-align: left;
      padding: 0 20px;

      @media (max-width: 1150px) {
        text-align: center;
      }

      h4 {
        font-weight: bold;
      }
      p {
        width: 250px;
      }
    }
  }
}
</style>
