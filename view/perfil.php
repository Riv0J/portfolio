<?php
$nombre_usuario = $usuario_buscado->nombre;
?>
<div class="caja_perfil">
    <h3 class="">
        Perfil de <?php echo $nombre_usuario ?>
    </h3>
</div>
<button type="submit" class="icon_title"><a href="index.php">Volver</a></button>
<section class="contenedor_animales">
    <?php
    $cantidad = count($array_animales);
    if($cantidad >0){
        for ($i=0; $i<$cantidad; $i++){
            $animal = $array_animales[$i];
            echo "<div class='carta_animal'>";
            echo "<img src='$animal->img_url' style='outline: 0.2rem solid  $animal->color;'>";
            echo "<h4>$animal->apodo</h4>";
            if($usuario !=null && ($usuario->nombre == $animal->nombre_usuario)){
                echo "<form action = 'index.php?section=edit_animal' method='POST' class='admin_menu'>";
                echo "<input type='hidden' name='id_animal' value='$animal->id'>";
                echo "<button class='icon_title' type='submit' name='action' value='delete'><i data_icon_name='delete'></i></button>";
                echo "<button class='icon_title' type='submit' name='action' value='edit_animal_section'><i data_icon_name='edit'></i></button>";
                echo "</form>";
            }
            echo "<h5>Creado por: $animal->nombre_usuario</h5>";
            echo"</div>";
        }
    } else{
        echo "<div class='carta_animal'>";
        echo "<img src='client/img/default.png'>";
        echo "<h5>Lo sentimos, no hay animalitos que concuerden con '".$busqueda."'</h5>";
        echo "<a class='button_submit' href='index.php'>Ver todos los animalitos</a></label>";
        echo"</div>";
    }
    ?>
</section>