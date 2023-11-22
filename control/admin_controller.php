<?php
//guardia de usuario
if(isset($_SESSION['usuario']) == false || $_SESSION['usuario'] == null){
    $_SESSION['mensaje'] = new Mensaje('¡Logéate para acceder a esta sección mirey!');
    header('Location: index.php?section=login');
    exit();
}
$usuario = $_SESSION['usuario'];
$action = '';
if(isset($_POST['action'])){
    $action = $_POST['action'];
}

$success = false;
switch($action){
    case 'reset_animales':
        $success = DBCAnimales::resetAnimalitos();
        if($success === true){
            $_SESSION['mensaje'] = new Mensaje('¡Todos los animalitos activo = 1!', 'success');
        } else {
            $_SESSION['mensaje'] = new Mensaje('No se ha podido hacer reset de los animales, consultar la BD');
        }
        break;
    case 'nuevo_animal_section':
        $img_url_options_array = DBCAnimales::getImg_url_options();
        include "view/new_animal.php";
        exit();
        break;
    case 'nuevo_animal_form':
        $apodo = 'lucas';
        $patas = 4;
        $color = 'Black';
        $sonido = 'Auuu';
        $img_url = 'default.png';

        if(isset($_POST['apodo']) && $_POST['apodo'] != ""){
            $apodo = $_POST['apodo'];
        }
        if(isset($_POST['patas']) && $_POST['patas'] != ""){
            $patas = $_POST['patas'];
        }
        if(isset($_POST['color']) && $_POST['color'] != ""){
            $color = $_POST['color'];
        }
        if(isset($_POST['sonido']) && $_POST['sonido'] != ""){
            $sonido = $_POST['sonido'];
        }
        if(isset($_POST['img_url']) && $_POST['img_url'] != ""){
            $img_url = $_POST['img_url'];
        }
        $success = DBCAnimales::insertAnimal($apodo, $patas, $color, $sonido, $img_url, $usuario->nombre);
        if($success === true){
            $_SESSION['mensaje'] = new Mensaje('Nuevo animalito creado', 'success');
        } else {
            $_SESSION['mensaje'] = new Mensaje('No se ha podido crear el animalito');
        }
        break;
    case 'cancel':
            $_SESSION['mensaje'] = new Mensaje('Operación cancelada correctamente','success');
    default:
        $_SESSION['mensaje'] = new Mensaje('Selecciona una accion admin válida, inténtalo de nuevo');
        break;
}
header('Location: index.php?section=galeria');
?>