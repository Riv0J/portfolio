<?php
    $login_header_content = "<a href='index.php?section=login'>Login</a> <a href='index.php?section=register'>Registrarse</a>";
    session_start();
    $usuario = null;
    if(isset($_SESSION['usuario'])){
        $usuario = $_SESSION['usuario'];
        $login_header_content = "<a href='index.php?section=perfil&action=ver&nombre_usuario=$usuario->nombre'><i data_icon_class='user'></i>Mi perfil</a><a class='icon_title' href='index.php?section=login&action=logout'><i data_icon_name='logout'></i></a>";
    }
?>
<header>
    <div id="header_wrapper">
        <aside>
            Animalit<div class="app_logo"></div>s.com
        </aside>
        <nav>
            <?php 
            if ($usuario!=null){
                include 'panel_admin.php';
            }
            ?>
            <a href='index.php'>Galería</a>
            <?php echo $login_header_content ?>
        </nav>
    </div>
    <?php
            if(isset($_SESSION['mensaje'])){
                $mensaje = $_SESSION['mensaje'];
                unset($_SESSION['mensaje']);
                echo "<section class='mensaje_section'><div class='icon_title'><i data_icon_name='".$mensaje->icon_name."'></i>".$mensaje->texto."</div></section>";
            } else{
                //echo "<section class='mensaje_section'> No Messages : </section>";
            }
    ?>
</header>