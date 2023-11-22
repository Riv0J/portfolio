<?php
//establecer la url base a la cual redirigir
$redirect_url = $_SERVER['PHP_SELF']. '?section=register';

//obtener la accon que se debe hacer
$action = 'register_view';
if(isset($_POST['action'])){
    $action = $_POST['action'];
}

$success = false;
switch($action){
    case 'register_view':
        include "view/register.php";
        //header('Location: '.$redirect_url);
        break;
    case 'register_form_submit':
        //obtener variables de post, si las hay
        $user = null;
        $pass = null;
        if(isset($_POST['user'], $_POST['pass'])){
            $user = $_POST['user'];
            $pass = $_POST['pass'];

            //db crear nuevo usuario
            $bd=new DBC();
            $new_user = DBCAnimales::newUsuario($user,$pass);
            if($new_user != null){
                session_start();
                $_SESSION['mensaje'] = new Mensaje('Registrado con éxito','success');
                $_SESSION['usuario'] = $new_user;
                header('Location: index.php');
            } else {
                $_SESSION['mensaje'] = new Mensaje('El usuario ya está tomado, elige otro!');
                header('Location: '.$redirect_url);
            }
        } else {
            $_SESSION['mensaje'] = new Mensaje('Introduce usuario y contraseña');
            include('view/register.php');
            exit;
        }
        break;
    default:
        $_SESSION['mensaje'] = new Mensaje('Selecciona una accion register válida, inténtalo de nuevo');
        break;
}
?>