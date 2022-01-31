<?php
    session_start();
    if (isset($_SESSION['searchEvento'])){
        echo $_SESSION['searchEvento'];
    } else {
        echo 0;
    }
?>