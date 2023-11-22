<?php
    //establecer la url base a la cual redirigir
    $redirect_url = $_SERVER['PHP_SELF']. '?section=login';
    //si el request no tiene accion, la accion predeterminada es login
    $action = 'login';
    if (isset($_GET['action'])){
        $action = $_GET['action'];
    }
    switch($action){
        case 'logout':
            session_start();
            if(isset($_SESSION['usuario'])){
                $nombre=$_SESSION['usuario']->nombre;
                unset($_SESSION['usuario']);
            }
            $_SESSION['mensaje'] = new Mensaje('Esperamos verte pronto, adiós '.$nombre.'!','success');
            $redirect_url = 'index.php';
            header('Location: ' . $redirect_url);
            break;
        case 'login':
            if (isset($_POST['nombre']) && isset($_POST['pass'])) {
                $nombre = $_POST['nombre'];
                $pass = $_POST['pass'];

                $bd = new DBC();
                $usuario = $bd->validarCredenciales($nombre, $pass);
                
                if ($usuario != null) {
                    session_start();
                    $_SESSION['usuario'] = $usuario;
                    $redirect_url = 'index.php';
                    $_SESSION['mensaje'] = new Mensaje('Bienvenido '.$nombre.'!','success');

                } else{
                    $_SESSION['mensaje'] = new Mensaje('Datos incorrectos bb','error');
                }
                header('Location: ' . $redirect_url);
            }
            break;
        default:
            break;
    }
    include "view/login.php";
?>