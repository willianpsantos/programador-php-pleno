<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class UserResetLinkMail extends Mailable
{
    use Queueable, SerializesModels;
    
    public $token;
    public $userName;
    
    protected function getResetLink($token, $route = "/password/reset/") {        
        $host       = $_SERVER['HTTP_HOST'];        
        $protocol   = "http://";
        $link = $protocol . $host . $route . $token;
        return $link;
    }

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token, $userName)
    {
        $this->userName = $userName;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->subject(__('messages.passwordredefinedemailsubject'));
        
        return $this->view('mail.resetlink')->with([
            'logoKma' => public_path() . "/img/logo-kma.jpg",
            'userName' => $this->userName,
            'link' => $this->getResetLink($this->token)
        ]);
    }
}