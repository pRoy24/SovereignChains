pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/utils/Counters.sol";


interface CallProxy{
    function anyCall(
        address _to,
        bytes calldata _data,
        address _fallback,
        uint256 _toChainID,
        uint256 _flags

    ) external payable;

    function context() external view returns (address from, uint256 fromChainID, uint256 nonce);
    
    function executor() external view returns (address executor);
}


contract SCCommunityPlot is
  Context,
  AccessControlEnumerable,
  ERC721Enumerable,
  ERC721Burnable,
  ERC721Pausable
  {
    uint private mintChain;

    address private anyCallContractAddress = 0xC10Ef9F491C9B59f936957026020C321651ac078;
    address private contractftm;
    address private contractpolygon;
    address private contractbnb;
    address private receivercontract = 0x3E2347a6F93eaC793C56DC508206e397eA11e83D;

    mapping(uint32 => address) contract_addresses;
     
    constructor(
      string memory name,
      string memory symbol,
      string memory baseTokenURI
    ) ERC721(name, symbol) {
    _baseTokenURI = baseTokenURI;
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
  }
  
  function mint(address to) public virtual {
    require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
    // We cannot just use balanceOf to create the new tokenId because tokens
    // can be burned (destroyed), so we need a separate counter.
    _mint(to, _tokenIdTracker.current());
    _tokenIdTracker.increment();
  }

  function mintUser(address to, uint chain, ControlledAccess memory coupon) public virtual {
    bytes32 digest = keccak256(abi.encode(id, msg.sender));
    require(_isVerifiedAccess(digest, coupon), "Coupon is invalid or expired");
    require(!_isAlreadyMinted(to), "Max 1 mint allowed per user");
    _mint(to, _tokenIdTracker.current());
    //_tokenIdTracker.increment();
    incrementGlobalTokenCounter();
  }  

  function incrementGlobalTokenCounter() {
    string _msg = 'INCREMENT_TOKEN_ID';

    CallProxy(anyCallContractAddress).anyCall(
      contractbnb,
      abi.encode(_msg),
      address(0),
      56,
      2
    );
     CallProxy(anyCallContractAddress).anyCall(
      contractftm,
      abi.encode(_msg),
      address(0),
      137,
      2
    );
     CallProxy(anyCallContractAddress).anyCall(
      contractftm,
      abi.encode(_msg),
      address(0),
      250,
      2
    );            
  }


  function anyExecute(bytes memory _data) external returns (bool success, bytes memory result){
    (string memory _msg) = abi.decode(_data, (string));  
    if (msg == 'INCREMENT_TOKEN_ID') {
      _tokenIdTracker.increment();   
    }
    emit NewMsg(_msg);
  }

  function _isVerifiedAccess(bytes32 digest, ControlledAccess memory coupon)
    private
    view
    returns (bool)
  {
    address signer = ecrecover(digest, coupon.v, coupon.r, coupon.s);
    require(signer != address(0), 'ECDSA: invalid signature');
    return hasRole(COUPON_SIGNER_ROLE, signer);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  /**
  * @dev See {IERC165-supportsInterface}.
  */
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(AccessControlEnumerable, ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}


