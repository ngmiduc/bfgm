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
          Minh Duc Nguyen‬<br />
          tel.: ‭+49 170 9515279‬<br />
          email: ngmiducdd@yahoo.de
        </p>
      </section>

      <section>
        <h4>gesetzliche Vertretung</h4>
        <p>
          Vorstand: Jessi Beck<br />
          Vorstand: Joseph Walther<br />
          stellv. Vorstand: Frida Volmer<br />
          stellv. Vorstand: Simon Garbe<br />
          fin. Vorstand: Minh Duc Nguyen
        </p>
      </section>

      <section>
        <h4>Register</h4>
        <p>
          Registergericht: Dresden<br />
          Vereinsregister: VR 11706<br />
          Steuernummer: 202/140/20565
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
