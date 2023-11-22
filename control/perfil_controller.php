<?php
//guardia de usuario
if(isset($_GET['nombre_usuario']) == false){
    $_SESSION['mensaje'] = new Mensaje('Usuario no válido');
    header('Location: index.php?section=login');
    exit();
}

$action = '';
if(isset($_GET['action'])){
    $action = $_GET['action'];
}

$usuario_buscado = DBCAnimales::getUsuarioByNombre($_GET['nombre_usuario']);
if($usuario_buscado == null){
    $action == 'error';
}

switch ($action) {
    case 'ver':
        $array_animales = DBCAnimales::misAnimales($usuario_buscado->nombre);
        include "view/perfil.php";
        break;
    default: 
        $_SESSION['mensaje'] = new Mensaje('No fué posible acceder al perfil');
        header("Location: index.php");
        break;
}
?>