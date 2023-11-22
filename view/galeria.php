
<?php
if(!(isset($busqueda))){
    $busqueda = null;
}
?>
<h3>Galería</h3>
<form class="contenedor_buscador">
    <!--<label for="busqueda">Buscar animalito por apodo! o   </label>-->
    <div class="contenedor_busqueda"><?php echo "<input type='text' name='busqueda' id='busqueda' value='".$busqueda."' placeholde='Buscar animal por apodo'>" ?> 
    <button type="submit">Buscar</button>
    <a class="button_submit" href='index.php'>Ver todos</a>
    </div>
</form>
<section class="contenedor_animales">
    <?php
    $cantidad = count($array_animales);
    if($cantidad >0){
        for ($i=0; $i<$cantidad; $i++){
            $animal = $array_animales[$i];
            $owner = "Desconocido";
            echo "<div class='carta_animal'>";
            echo "<img src='$animal->img_url' style='outline: 0.2rem solid  $animal->color;'>";
            echo "<h4>$animal->apodo</h4>";
            if($animal->nombre_usuario!=null){
                $owner = $animal->nombre_usuario;
                echo "<a href='index.php?section=perfil&action=ver&nombre_usuario=$owner'><button class='icon_title_no_gap' type='submit'><i data_icon_name='github'></i><h5>Creado por: $owner</h5></button></a>";
            } else {
                echo "<h5>Creado por: $owner</h5>";
            }
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