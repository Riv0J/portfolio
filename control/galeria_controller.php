<?php
require_once "connection/DBCAnimales.class.php";

$busqueda = '';
if(isset($_GET['busqueda'])){
    $busqueda = $_GET['busqueda'];
}
$bd=new DBC();
$array_animales = DBCAnimales::getAnimalitos($busqueda);

//Reenviar esos recursos a la vista view_inicio
$buscador = true;
include "view/galeria.php";
?>