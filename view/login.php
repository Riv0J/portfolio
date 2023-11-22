<h3> Login </h3>
<form action="<?php echo $_SERVER['PHP_SELF']. '?section=login'; ?>" method='POST' class="login_form">
    <label for="nombre">Nombre</label>
    <input type="text" name="nombre">
    <label for="pass">Contraseña</label> <!-- Cambiado de "nombre" a "pass" -->
    <input type="password" name="pass">
    <button type="submit">Iniciar sesión</button>
</form>